import axios from 'axios'
import parse from '../assets/bookParserFunc'

// INITIAL LIBRARY STATE
const initialScanResults = [
  {
    BookId: 'ggbLDwAAQBAJ',
    ISBN: '9780593203378',
    author: ['Roald Dahl'],
    coverImage:
      'http://books.google.com/books/content?id=ggbLDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    description:
      "Now a musical! Matilda is a sweet, exceptional young girl, but her parents think she's just a nuisance. She expects school to be different but there she has to face Miss Trunchbull, a menacing, kid-hating headmistress. When Matilda is attacked by the Trunchbull she suddenly discovers she has a remarkable power with which to fight back. It'll take a superhuman genius to give Miss Trunchbull what she deserves and Matilda may be just the one to do it! Here is Roald Dahl's original novel of a little girl with extraordinary powers. This much-loved story has recently been made into a wonderful new musical, adapted by Dennis Kelly with music and lyrics by Tim Minchin.",
    genres: ['Juvenile Fiction'],
    numPages: 192,
    title: 'Matilda',
    year: '2020',
    averageRating: 4,
    ratingsCount: 23,
  },
  {
    BookId: 'EXZCAAAAQBAJ',
    ISBN: '9780387272269',
    author: ['Fred Diamond', 'Jerry Shurman'],
    coverImage:
      'http://books.google.com/books/content?id=EXZCAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    description:
      'This book introduces the theory of modular forms, from which all rational elliptic curves arise, with an eye toward the Modularity Theorem. Discussion covers elliptic curves as complex tori and as algebraic curves; modular curves as Riemann surfaces and as algebraic curves; Hecke operators and Atkin-Lehner theory; Hecke eigenforms and their arithmetic properties; the Jacobians of modular curves and the Abelian varieties associated to Hecke eigenforms. As it presents these ideas, the book states the Modularity Theorem in various forms, relating them to each other and touching on their applications to number theory. The authors assume no background in algebraic number theory and algebraic geometry. Exercises are included.',
    genres: ['Mathematics'],
    numPages: 450,
    title: 'A First Course in Modular Forms',
    year: '2006',
    averageRating: 4,
    ratingsCount: 23,
  },
  {
    BookId: 'iARl5C-ye-AC',
    ISBN: '9780547346656',
    author: ['Carson McCullers'],
    coverImage:
      'http://books.google.com/books/content?id=iARl5C-ye-AC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    description:
      'With the publication of her first novel, The Heart is a Lonely Hunter, Carson McCullers, all of twenty-three, became a literary sensation. With its profound sense of moral isolation and its compassionate glimpses into its characters\' inner lives, the novel is considered McCullers\' finest work, an enduring masterpiece first published by Houghton Mifflin in 1940. At its center is the deaf-mute John Singer, who becomes the confidant for various types of misfits in a Georgia mill town during the 1930s. Each one yearns for escape from small town life. When Singer\'s mute companion goes insane, Singer moves into the Kelly house, where Mick Kelly, the book\'s heroine (and loosely based on McCullers), finds solace in her music. Wonderfully attuned to the spiritual isolation that underlies the human condition, and with a deft sense for racial tensions in the South, McCullers spins a haunting, unforgettable story that gives voice to the rejected, the forgotten, and the mistreated—and, through Mick Kelly, gives voice to the quiet, intensely personal search for beauty. Richard Wright praised Carson McCullers for her ability "to rise above the pressures of her environment and embrace white and black humanity in one sweep of apprehension and tenderness." She writes "with a sweep and certainty that are overwhelming," said the New York Times. McCullers became an overnight literary sensation, but her novel has endured, just as timely and powerful today as when it was first published. The Heart is a Lonely Hunter is Carson McCullers at her most compassionate, endearing best.',
    genres: ['Fiction'],
    numPages: 368,
    title: 'The Heart Is a Lonely Hunter',
    year: '2010',
    averageRating: 4,
    ratingsCount: 23,
  },
  {
    BookId: 'u0W4zg1OzBEC',
    ISBN: '1429960566',
    author: ['Tom Wolfe'],
    coverImage:
      'http://books.google.com/books/content?id=u0W4zg1OzBEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    description:
      'Vintage Tom Wolfe, The Bonfire of the Vanities, the #1 bestseller that will forever define late-twentieth-century New York style. "No one has portrayed New York Society this accurately and devastatingly since Edith Wharton" (The National Review) “A page-turner . . . Brilliant high comedy.” (The New Republic)',
    genres: ['Fiction'],
    numPages: 704,
    title: 'The Bonfire of the Vanities',
    year: '2002',
    averageRating: 4,
    ratingsCount: 23,
  },
  {
    BookId: '3ccaAAAAQBAJ',
    ISBN: '9781101660034',
    author: ['Chang-rae Lee'],
    coverImage:
      'http://books.google.com/books/content?id=3ccaAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    description:
      "The debut novel from critically-acclaimed and New York Times–bestselling author of On Such a Full Sea. In Native Speaker, author Chang-rae Lee introduces readers to Henry Park. Park has spent his entire life trying to become a true American—a native speaker. But even as the essence of his adopted country continues to elude him, his Korean heritage seems to drift further and further away. Park's harsh Korean upbringing has taught him to hide his emotions, to remember everything he learns, and most of all to feel an overwhelming sense of alienation. In other words, it has shaped him as a natural spy. But the very attributes that help him to excel in his profession put a strain on his marriage to his American wife and stand in the way of his coming to terms with his young son's death. When he is assigned to spy on a rising Korean-American politician, his very identity is tested, and he must figure out who he is amid not only the conflicts within himself but also within the ethnic and political tensions of the New York City streets. Native Speaker is a story of cultural alienation. It is about fathers and sons, about the desire to connect with the world rather than stand apart from it, about loyalty and betrayal, about the alien in all of us and who we finally are. From the Trade Paperback edition.",
    genres: ['Fiction'],
    numPages: 368,
    title: 'Native Speaker',
    year: '1996',
    averageRating: 4,
    ratingsCount: 23,
  },
  {
    BookId: 'THIS_IS_A_BOOK_ID',
    ISBN: 'some_isbn_string',
    author: [
      'BookSnaps Is the Author but Is it Realy the author when I have so many',
    ],
    coverImage:
      'http://books.google.com/books/content?id=3ccaAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    genres: ['Fiction'],
    numPages: 368,
    title: 'A Book With A Really Long Title Just So I Can See Wrapping',
    year: '1996',
    averageRating: 4.3,
    ratingsCount: 23,
  },
]

// ACTION CONSTANTS
const GOT_SCAN_RESULTS = 'GOT_SCAN_RESULTS'
const REMOVE_SCAN_ITEMS = 'REMOVE_SCAN_ITEMS'

// ACTION CREATORS
export const gotScanResults = (scanResults) => ({
  type: GOT_SCAN_RESULTS,
  scanResults,
})
export const removeScanItems = (books) => ({
  type: REMOVE_SCAN_ITEMS,
  books,
})

// THUNK CREATORS
// takes array of detected text -> makes api call -> sets results to parsed data
export const getScanResults = (scanArray) => async (dispatch) => {
  try {
    // takes the array of scan results and queries Google Books API
    const scanResults = await Promise.all(
      scanArray.map((text) =>
        axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${text}&maxResults=1`
        )
      )
    )
    const scanResultsParse = scanResults
      .filter((result) => result.data.items)
      .map((result) => {
        return parse(result.data.items[0])
      })
    dispatch(gotScanResults(scanResultsParse))
  } catch (err) {
    console.error(err)
  }
}

export const getBarcodeResult = (isbn) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&maxResults=1`
    )
    if (res.data.items) {
      dispatch(gotScanResults([parse(res.data.items[0])]))
    }
  } catch (err) {
    console.error(err)
  }
}

// LIBRARY REDUCER
const scanReducer = (scanResults = initialScanResults, action) => {
  let ids
  switch (action.type) {
    case GOT_SCAN_RESULTS:
      ids = scanResults.map((elt) => elt.BookId)
      const filteredScanResults = action.scanResults.filter(
        (elt) => !ids.includes(elt.BookId)
      )
      return [...scanResults, ...filteredScanResults]
    case REMOVE_SCAN_ITEMS:
      ids = action.books.map((book) => book.BookId)
      let scanResultsFiltered = scanResults.filter(
        (book) => !ids.includes(book.BookId)
      )
      return scanResultsFiltered
    default:
      return scanResults
  }
}

export default scanReducer
