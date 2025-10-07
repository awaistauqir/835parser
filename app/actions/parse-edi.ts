// app/actions/parse-edi.ts
"use server";

import { parseEdi835 } from "@/lib/edi-parser";
import { ParsedEdiFile } from "@/types/edi";
import { z } from "zod";

const parseInputSchema = z.object({
  files: z.array(z.instanceof(File)).optional(),
  text: z.string().optional(),
});

export async function parseEdiFiles(
  formData: FormData
): Promise<ParsedEdiFile[]> {
  const rawFiles = formData.getAll("files") as File[];
  const textInput = formData.get("text") as string | null;

  const validated = parseInputSchema.parse({
    files: rawFiles.length > 0 ? rawFiles : undefined,
    text: textInput || undefined,
  });

  const results: ParsedEdiFile[] = [];

  if (validated.text) {
    results.push(parseEdi835(validated.text, "pasted-edi.txt"));
  }

  if (validated.files) {
    for (const file of validated.files) {
      const text = await file.text();
      results.push(parseEdi835(text, file.name));
    }
  }

  return results;
}
