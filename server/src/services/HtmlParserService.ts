import { parse } from 'node-html-parser';

export class HtmlParserService {
    static queryHtmlBySelector(htmlString: string, querySelector: string): string | null {
        try {
            const htmlRoot = parse(htmlString);
            const result = htmlRoot.querySelector(querySelector);
            return result 
                ? result.toString()
                : null;
        } catch (_) {
            return null;
        }
    }
}