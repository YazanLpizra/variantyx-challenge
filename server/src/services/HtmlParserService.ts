import { parse } from 'node-html-parser';

export class HtmlParserService {
    static queryHtmlBySelector(htmlString: string, querySelector: string): any {
        try {
            const htmlRoot = parse(htmlString);
            const result = htmlRoot.querySelector(querySelector);
            return result;
        } catch (error) {
            throw new Error('Could not parse article page for abstract');
        }
    }
}