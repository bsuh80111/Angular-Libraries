import { Injectable } from '@angular/core';

export type SearchMatch = {
  startIndex: number;
  endIndex: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  normalizeString(text: string): string {
    const normalizedText = text
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Seperate diacritics from the base character and then remove the diacritics
      .replace("ø", 'o'); // Handle special cases

    return normalizedText;
  }

  matchExists(text: string, searchString: string): boolean {
    const normalizedText = this.normalizeString(text);
    const normalizedSearchString = this.normalizeString(searchString);

    return normalizedText.includes(normalizedSearchString);
  }
  
  findMatch(text: string, searchString: string): SearchMatch | null {
    const normalizedText = this.normalizeString(text);
    const normalizedSearchString = this.normalizeString(searchString);

    const startIndex = normalizedText.indexOf(normalizedSearchString);

    if (startIndex === -1) {
      return null;
    }

    return {
      startIndex,
      endIndex: startIndex + normalizedSearchString.length
    };
  }
}
