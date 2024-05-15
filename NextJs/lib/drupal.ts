import { getSession } from "next-auth/react";
import { DrupalClient } from "next-drupal"


export const drupal = new DrupalClient(
  process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
  {
      previewSecret: process.env.DRUPAL_PREVIEW_SECRET,
  }
)



export const getAccessToken = (credentials) => drupal.getAccessToken(credentials);