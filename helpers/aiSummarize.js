/**
 * This file is part of Feather Wiki.
 *
 * Feather Wiki is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * Feather Wiki is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with Feather Wiki. If not, see https://www.gnu.org/licenses/.
 */

import OpenAI from "openai";

/**
 * AI Summarization helper for Feather Wiki
 * This module provides functionality to summarize wiki pages using AI APIs
 */

/**
 * Summarize content using OpenAI API
 * @param {string} content - The content to summarize
 * @param {number} maxLength - Maximum length of summary (default: 150)
 * @returns {Promise<string>} The generated summary
 */
export const summarizeWithOpenAI = async (content, maxLength = 150) => {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
      dangerouslyAllowBrowser: true, // Required for client-side usage
    });

    const response = await client.responses.create({
      model: "gpt-4o",
      instructions: `You are a helpful assistant that creates concise summaries of wiki content. Create a summary that is approximately ${maxLength} characters or less, focusing on the key points and main ideas.`,
      input: `Please summarize the following wiki content:\n\n${content}`,
    });

    return response.output_text?.trim() || "Unable to generate summary";
  } catch (error) {
    throw new Error(`OpenAI summarization failed: ${error.message}`);
  }
};

/**
 * Main summarization function using OpenAI
 * @param {string} content - The content to summarize
 * @param {number} maxLength - Maximum length of summary (default: 150)
 * @returns {Promise<string>} The generated summary
 */
export const summarizeContent = async (content, maxLength = 150) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "OpenAI API key is required. Please set the OPENAI_API_KEY environment variable when building the application."
      );
    }
    return await summarizeWithOpenAI(content, maxLength);
  } catch (error) {
    console.error("OpenAI summarization failed:", error.message);
    throw error;
  }
};
