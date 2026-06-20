"use server";

import { supabase } from "../../lib/supabase";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function verifyPassword(password: string): Promise<boolean> {
  return password === process.env.ADMIN_PASSWORD;
}

export type StudentFormData = {
  fullName: string;
  photoUrl: string;
  degree: string;
  duration: string;
  bio: string;
  linkedinUrl: string;
  twitterUrl: string;
  graduationYear: string;
  gpa: string;
  achievements: string;
};

export async function addStudent(
  password: string,
  data: StudentFormData
): Promise<{ success: boolean; error?: string }> {
  if (password !== process.env.ADMIN_PASSWORD) {
    return { success: false, error: "Unauthorized" };
  }

  const achievements = data.achievements
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const { error } = await supabase.from("students").insert({
    full_name: data.fullName.trim(),
    slug: slugify(data.fullName),
    profile_photo_url: data.photoUrl.trim(),
    program: data.degree.trim(),
    duration: data.duration.trim(),
    bio: data.bio.trim(),
    linkedin_url: data.linkedinUrl.trim() || null,
    twitter_url: data.twitterUrl.trim() || null,
    cohort_year: parseInt(data.graduationYear, 10),
    gpa: data.gpa.trim() || null,
    achievements,
    gallery_urls: [],
    is_published: true,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateStudent(
  token: string,
  data: StudentFormData & { galleryUrls: string }
): Promise<{ success: boolean; error?: string }> {
  // First, find the student by edit_token
  const { data: student, error: fetchError } = await supabase
    .from("students")
    .select("id, slug")
    .eq("edit_token", token)
    .single();

  if (fetchError || !student) {
    return { success: false, error: "Invalid or expired edit link" };
  }

  // Process achievements
  const achievements = data.achievements
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  // Process gallery URLs
  const galleryUrls = data.galleryUrls
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  // Update the student
  const { error } = await supabase
    .from("students")
    .update({
      full_name: data.fullName.trim(),
      slug: slugify(data.fullName),
      profile_photo_url: data.photoUrl.trim(),
      program: data.degree.trim(),
      duration: data.duration.trim(),
      bio: data.bio.trim(),
      linkedin_url: data.linkedinUrl.trim() || null,
      twitter_url: data.twitterUrl.trim() || null,
      cohort_year: parseInt(data.graduationYear, 10),
      gpa: data.gpa.trim() || null,
      achievements,
      gallery_urls: galleryUrls,
    })
    .eq("id", student.id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
