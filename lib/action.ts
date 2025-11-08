"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import z from "zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);

    return "CredentialsSignin";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password.";
        default:
          return "Something went wrong. Please try again.";
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  "use server";
  try {
    await signOut({ redirectTo: "/auth/login" });
  } catch (error) {
    if ((error as Error).message !== "NEXT_REDIRECT") {
      console.error("Sign out error:", error);
      throw error;
    }
  }
}

function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .trim();
}

const CategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
});

export async function createTalentCategory(
  prevState: string | undefined,
  formData: FormData
) {
  "use server";

  const validatedFields = CategorySchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return validatedFields.error.flatten().fieldErrors.name?.[0];
  }

  const { name } = validatedFields.data;
  const slug = createSlug(name);

  try {
    const existing = await prisma.category.findFirst({
      where: { OR: [{ name }, { slug }] },
    });
    if (existing) {
      return "A category with this name or slug already exists.";
    }

    await prisma.category.create({
      data: {
        name,
        slug,
      },
    });

    revalidatePath("/dashboard/categories");
    return "Category created successfully.";
  } catch (error) {
    console.error(error);
    return "Failed to create category due to a server error.";
  }
}

export async function deleteTalentCategory(id: string) {
  "use server";

  try {
    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/dashboard/categories");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete category." };
  }
}

const TalentSchema = z.object({
  name: z.string().min(2, "Name is required."),
  bio: z.string().min(10, "Bio must be at least 10 characters."),
  profileImage: z.string().url("Must be a valid URL."),
});

export async function createTalent(
  prevState: string | undefined,
  formData: FormData
) {
  "use server";

  const validatedFields = TalentSchema.safeParse({
    name: formData.get("name"),
    bio: formData.get("bio"),
    profileImage: formData.get("profileImage"),
  });

  if (!validatedFields.success) {
    return (
      validatedFields.error.flatten().fieldErrors.name?.[0] ||
      validatedFields.error.flatten().fieldErrors.bio?.[0] ||
      validatedFields.error.flatten().fieldErrors.profileImage?.[0]
    );
  }

  const { name, bio, profileImage } = validatedFields.data;
  const slug = createSlug(name);

  const categoryIds = formData.getAll("categoryIds") as string[];
  const skills = (formData.get("skills") as string)
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (categoryIds.length === 0) {
    return "You must select at least one category.";
  }

  try {
    const existing = await prisma.talent.findUnique({ where: { slug } });
    if (existing) {
      return "A talent with this name (or slug) already exists.";
    }

    await prisma.talent.create({
      data: {
        name,
        slug,
        bio,
        profileImage,
        skills,

        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },

        age: formData.get("age")
          ? parseInt(formData.get("age") as string)
          : null,
        height: (formData.get("height") as string) || null,
        location: (formData.get("location") as string) || null,
        email: (formData.get("email") as string) || null,
        phone: (formData.get("phone") as string) || null,
      },
    });
  } catch (error) {
    console.error(error);
    return "Database Error: Failed to create talent.";
  }

  revalidatePath("/dashboard/talents");
  redirect("/dashboard/talents");
}

export async function updateTalent(
  id: string,
  prevState: string | undefined,
  formData: FormData
) {
  "use server";

  const validatedFields = TalentSchema.safeParse({
    name: formData.get("name"),
    bio: formData.get("bio"),
    profileImage: formData.get("profileImage"),
  });

  if (!validatedFields.success) {
    return (
      validatedFields.error.flatten().fieldErrors.name?.[0] ||
      validatedFields.error.flatten().fieldErrors.bio?.[0] ||
      validatedFields.error.flatten().fieldErrors.profileImage?.[0]
    );
  }

  const { name, bio, profileImage } = validatedFields.data;
  const categoryIds = formData.getAll("categoryIds") as string[];
  const skills = (formData.get("skills") as string)
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (categoryIds.length === 0) {
    return "You must select at least one category.";
  }

  try {
    await prisma.talent.update({
      where: { id },
      data: {
        name,
        bio,
        profileImage,
        skills,

        categories: {
          set: categoryIds.map((id) => ({ id })),
        },

        age: formData.get("age")
          ? parseInt(formData.get("age") as string)
          : null,
        height: (formData.get("height") as string) || null,
        location: (formData.get("location") as string) || null,
        email: (formData.get("email") as string) || null,
        phone: (formData.get("phone") as string) || null,
      },
    });
  } catch (error) {
    console.error(error);
    return "Database Error: Failed to update talent.";
  }

  revalidatePath("/dashboard/talents");
  revalidatePath(`/dashboard/talents/${id}/edit`);
  redirect("/dashboard/talents");
}

export async function deleteTalent(id: string) {
  "use server";

  try {
    await prisma.talent.delete({
      where: { id },
    });

    revalidatePath("/dashboard/talents");
    return { success: true, message: "Talent deleted successfully." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Database Error: Failed to delete talent.",
    };
  }
}

const BlogCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
});

export async function createBlogCategory(
  prevState: string | undefined,
  formData: FormData
) {
  "use server";

  const validatedFields = BlogCategorySchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return validatedFields.error.flatten().fieldErrors.name?.[0];
  }

  const { name } = validatedFields.data;
  const slug = createSlug(name);

  try {
    const existing = await prisma.blogCategory.findFirst({
      where: { OR: [{ name }, { slug }] },
    });
    if (existing) {
      return "A blog category with this name or slug already exists.";
    }

    await prisma.blogCategory.create({
      data: {
        name,
        slug,
      },
    });

    revalidatePath("/dashboard/blog-categories");
    return "Category created successfully.";
  } catch (error) {
    console.error(error);
    return "Failed to create category.";
  }
}

export async function deleteBlogCategory(id: string) {
  "use server";

  try {
    await prisma.blogCategory.delete({
      where: { id },
    });

    revalidatePath("/dashboard/blog-categories");
    return { success: true, message: "Blog category deleted." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete category." };
  }
}

const PostSchema = z.object({
  title: z.string().min(3, "Title is required."),
  content: z.string().min(100, "Content must be at least 100 characters."),
  excerpt: z.string().max(300, "Excerpt is too long.").optional(),
  featuredImage: z.string().url("Must be a valid URL.").optional(),
  author: z.string().min(2, "Author name is required."),
});

export async function createBlogPost(
  prevState: string | undefined,
  formData: FormData
) {
  "use server";

  const validatedFields = PostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    excerpt: formData.get("excerpt"),
    featuredImage: formData.get("featuredImage") || undefined,
    author: formData.get("author"),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return (
      errors.title?.[0] ||
      errors.content?.[0] ||
      errors.excerpt?.[0] ||
      errors.featuredImage?.[0] ||
      errors.author?.[0]
    );
  }

  const { title, content, excerpt, featuredImage, author } =
    validatedFields.data;
  const slug = createSlug(title);

  const categoryIds = formData.getAll("categoryIds") as string[];
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const isPublished = formData.get("published") === "on";

  try {
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return "A post with this title (or slug) already exists.";
    }

    await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        featuredImage,
        author,
        tags,
        published: isPublished,
        publishedAt: isPublished ? new Date() : null,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
      },
    });
  } catch (error) {
    console.error(error);
    return "Database Error: Failed to create blog post.";
  }

  revalidatePath("/dashboard/blog");
  redirect("/dashboard/blog");
}

export async function updateBlogPost(
  id: string,
  prevState: string | undefined,
  formData: FormData
) {
  "use server";

  const validatedFields = PostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    excerpt: formData.get("excerpt"),
    featuredImage: formData.get("featuredImage") || undefined,
    author: formData.get("author"),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return (
      errors.title?.[0] ||
      errors.content?.[0] ||
      errors.excerpt?.[0] ||
      errors.featuredImage?.[0] ||
      errors.author?.[0]
    );
  }

  const { title, content, excerpt, featuredImage, author } =
    validatedFields.data;

  const categoryIds = formData.getAll("categoryIds") as string[];
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const isPublished = formData.get("published") === "on";

  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        content,
        excerpt,
        featuredImage,
        author,
        tags,
        published: isPublished,
        publishedAt: isPublished ? new Date() : null,
        categories: {
          set: categoryIds.map((id) => ({ id })),
        },
      },
    });
  } catch (error) {
    console.error(error);
    return "Database Error: Failed to update blog post.";
  }

  revalidatePath("/dashboard/blog");
  revalidatePath(`/dashboard/blog/${id}/edit`);
  redirect("/dashboard/blog");
}

export async function deleteBlogPost(id: string) {
  "use server";

  try {
    await prisma.blogPost.delete({
      where: { id },
    });

    revalidatePath("/dashboard/blog");
    return { success: true, message: "Blog post deleted successfully." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Database Error: Failed to delete post.",
    };
  }
}
