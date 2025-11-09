"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import z from "zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import cloudinary from "./cloudinary";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const isFeatured = formData.get("featured") === "on";

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
        featured: isFeatured,

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

  const isFeatured = formData.get("featured") === "on";

  try {
    await prisma.talent.update({
      where: { id },
      data: {
        name,
        bio,
        profileImage,
        skills,
        featured: isFeatured,

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

export async function updateInquiryStatus(id: string, newStatus: string) {
  "use server";

  try {
    await prisma.inquiry.update({
      where: { id },
      data: { status: newStatus },
    });

    revalidatePath("/dashboard/inquiries");
    return { success: true, message: "Inquiry status updated." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Database Error: Failed to update status.",
    };
  }
}

export async function deleteInquiry(id: string) {
  "use server";

  try {
    await prisma.inquiry.delete({
      where: { id },
    });

    revalidatePath("/dashboard/inquiries");
    return { success: true, message: "Inquiry deleted." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Database Error: Failed to delete inquiry.",
    };
  }
}

const InquirySchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("A valid email is required."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  talentId: z.string().optional(),
});

export async function submitInquiry(
  prevState: string | undefined,
  formData: FormData
) {
  "use server";

  const validatedFields = InquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    talentId: formData.get("talentId") || undefined,
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return errors.name?.[0] || errors.email?.[0] || errors.message?.[0];
  }

  const { name, email, message, talentId } = validatedFields.data;

  const company = (formData.get("company") as string) || null;
  const phone = (formData.get("phone") as string) || null;

  try {
    await prisma.inquiry.create({
      data: {
        name,
        email,
        message,
        talentId: talentId || null,
        company,
        phone,
        status: "new",
      },
    });

    const adminEmailHtml = `
      <div>
        <h1>New Inquiry from Ambassadors Website</h1>
        <p>You've received a new message from <strong>${name}</strong> (${email}).</p>
        ${
          talentId
            ? `<p><strong>Regarding Talent ID:</strong> ${talentId}</p>`
            : ""
        }
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <hr>
        <h2>Message:</h2>
        <p>${message}</p>
      </div>
    `;

    const customerEmailHtml = `
      <div>
        <h1>We've Received Your Inquiry</h1>
        <p>Hi ${name},</p>
        <p>Thank you for contacting Ambassadors. We've received your message and will get back to you as soon as possible.</p>
        <p><strong>Your Message:</strong></p>
        <blockquote style="border-left: 2px solid #ccc; padding-left: 10px; margin-left: 10px; font-style: italic;">
          ${message}
        </blockquote>
        <br>
        <p>Best regards,</p>
        <p>The Ambassadors Team</p>
      </div>
    `;

    try {
      await Promise.all([
        resend.emails.send({
          from: `Ambassadors <${process.env.SENDER_EMAIL}>`,
          to: process.env.ADMIN_EMAIL!,
          subject: `New Inquiry from ${name}`,
          html: adminEmailHtml,
        }),

        resend.emails.send({
          from: `Ambassadors Team <${process.env.SENDER_EMAIL}>`,
          to: email,
          subject: "We've Received Your Inquiry",
          html: customerEmailHtml,
        }),
      ]);
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }

    return "Success! Your inquiry has been sent.";
  } catch (databaseError) {
    console.error("Database Error:", databaseError);
    return "Database Error: Failed to send inquiry. Please try again later.";
  }
}

export async function addImageToTalent(
  talentId: string,
  imageUrl: string,
  publicId: string
) {
  "use server";

  try {
    const newImage = await prisma.image.create({
      data: {
        talentId: talentId,
        url: imageUrl,
        publicId: publicId,
      },
    });

    revalidatePath(`/dashboard/talents/${talentId}/edit`);
    return { success: true, image: newImage };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Database Error: Failed to add image." };
  }
}

export async function deleteImage(
  imageId: string,
  publicId: string,
  talentId: string
) {
  "use server";

  try {
    await prisma.image.delete({
      where: { id: imageId },
    });

    await cloudinary.uploader.destroy(publicId);

    revalidatePath(`/dashboard/talents/${talentId}/edit`);
    return { success: true, message: "Image deleted successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete image." };
  }
}

export async function addReelToTalent(
  talentId: string,
  title: string,
  videoUrl: string,
  publicId: string
) {
  "use server";

  if (!title) {
    return { success: false, error: "Reel title is required." };
  }

  try {
    const newReel = await prisma.reel.create({
      data: {
        talentId: talentId,
        title: title,
        url: videoUrl,
        publicId: publicId,
      },
    });

    revalidatePath(`/dashboard/talents/${talentId}/edit`);
    return { success: true, reel: newReel };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Database Error: Failed to add reel." };
  }
}

export async function deleteReel(
  reelId: string,
  publicId: string,
  talentId: string
) {
  "use server";

  try {
    await prisma.reel.delete({
      where: { id: reelId },
    });

    await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });

    revalidatePath(`/dashboard/talents/${talentId}/edit`);
    return { success: true, message: "Reel deleted successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete reel." };
  }
}

export async function incrementTalentView(talentId: string) {
  "use server";
  try {
    await prisma.talent.update({
      where: { id: talentId },
      data: {
        views: { increment: 1 },
      },
    });
  } catch (error) {
    console.error("Failed to increment talent view:", error);
  }
}

export async function incrementBlogView(postId: string) {
  "use server";
  try {
    await prisma.blogPost.update({
      where: { id: postId },
      data: {
        views: { increment: 1 },
      },
    });
  } catch (error) {
    console.error("Failed to increment blog view:", error);
  }
}
