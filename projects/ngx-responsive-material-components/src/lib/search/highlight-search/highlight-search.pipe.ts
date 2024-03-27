import { Pipe, PipeTransform } from '@angular/core';
import { SearchService } from '../search.service';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';

@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearchPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer,
    private searchService: SearchService
  ) { }

  transform(input: unknown, searchString?: string): SafeValue {
    let value: string = String(input);

    if (value === null || !searchString) {
      return value;
    }

    const match = this.searchService.findMatch(value, searchString);

    if (!match) {
      return value;
    }

    let highlightedText = '';
    highlightedText += value.substring(0, match.startIndex);
    highlightedText += `<span style="background-color: yellow;">${value.substring(match.startIndex, match.endIndex)}</span>`;
    highlightedText += value.substring(match.endIndex, value.length);

    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }
}
