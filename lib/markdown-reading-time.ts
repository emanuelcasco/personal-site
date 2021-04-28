/*!
 * **markdown-reading-time**
 * Copyright (c) Emanuel Casco ⛑ (https://github.com/emanuelcasco)
 * MIT Licensed
 */

// 👇 See RegExp in action: https://regex101.com/r/j0FGQ2/1
const IMAGE_VALIDATION_REGEXP =
  /(!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\))|(<img)/g;
// 👇 See RegExp in action: https://regex101.com/r/JVPouF/1
const WORD_VALIDATION_REGEXP = /\w+/g;
// 👇 Values defined on this Medium post: https://blog.medium.com/read-time-and-you-bc2048ab620c
const DEFAULT_WORDS_PER_MINUTE = 275;
const IMAGE_FACTOR_IN_SECONDS = 12;

interface Configuration {
  wordsPerMinute?: number;
  includeImages?: boolean;
}

interface ReadingStats {
  time: number;
  wordsCount: number;
  minutes: number;
  imagesCount?: number;
  imagesTime?: number;
}

const getMatchesByRegexp = (regexp: RegExp) => (content: string) => {
  if (!content) return 0;
  const result = content.match(regexp);
  return result ? result.length : 0;
};

const getWordsCount = getMatchesByRegexp(WORD_VALIDATION_REGEXP);
const getImagesCount = getMatchesByRegexp(IMAGE_VALIDATION_REGEXP);

/**
 * Based on MEDIUM reading time calculation criteria described in the following post:
 * https://blog.medium.com/read-time-and-you-bc2048ab620c
 *
 * @param content Markdown content.
 * @param config (Optional)
 * @param config.wordsPerMinute (Default: 275) Words per minute used to calculate the reading time.
 * @param config.includeImages (Default: 275) Enable include images reading time in the estimation.
 * @returns Markdown content reading time estimation.
 *
 * Read time is based on the average reading speed of an adult (roughly 275 WPM). 
 * We take the total word count of a post and translate it into minutes.
 *
 * For images, the algorithm count 12 seconds for the first image, 11 for the second,
 * and minus an additional second for each subsequent image.
 * Any images after the tenth image are counted at three seconds.
 */
const calculateMarkdownFileReadingTime = (
  content: string,
  config?: Configuration,
): ReadingStats => {
  // Setup configuration
  const wordsPerMinute =
    config?.wordsPerMinute || DEFAULT_WORDS_PER_MINUTE;
  const includeImages =
    config?.includeImages || true;

  // Calculate words count, time (miliseconds) and minutes
  const wordsCount = getWordsCount(content);
  let minutes = wordsCount / wordsPerMinute;
  let time = Math.round(minutes * 60 * 1_000);
  let imagesCount = 0;
  let imagesTime = 0;

  if (includeImages) {
    // Get images coutn and update response value
    imagesCount = getImagesCount(content);
    // Iterate over image quantity to calculate the images reading time
    let imageFactor = IMAGE_FACTOR_IN_SECONDS;
    let processedImages = 0;
    let accumulatedSeconds = 0;
    while(processedImages < imagesCount) {
      accumulatedSeconds += imageFactor;
      if (processedImages < 10) imageFactor--;
      processedImages++;
    }
    // Update response values
    imagesTime = Math.round(accumulatedSeconds * 1_000);
    minutes += Math.round(accumulatedSeconds / 60);
    time += imagesTime;
  }

  return {
    imagesCount,
    imagesTime,
    minutes: Math.round(minutes),
    time,
    wordsCount
  };
};

export default calculateMarkdownFileReadingTime;
