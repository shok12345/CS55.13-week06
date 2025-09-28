import { parseISO, format } from 'date-fns';
 
export default function Date({ dateString }) {
    const date = parseISO(dateString);
    try {
      return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
    } catch (error) {
      return"";
    }
}