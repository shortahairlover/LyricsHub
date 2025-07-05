import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const artist = searchParams.get('artist')
    const title = searchParams.get('title')

    const query = `${artist} ${title}`

    const searchResponse = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer KOiUNu8m7iW1TcKDE0aSPNrfLnCPZEHS5PSh-qi5p-ldKpjPRqdD520SlRaG1cDE`, 
        //dont take this pls, ill give u a cookie instead
      },
    })

    const searchData = await searchResponse.json()

    if (!searchData.response.hits.length) {
      return NextResponse.json({ lyrics: null, url: null })
    }

    const songUrl = searchData.response.hits[0].result.url
    const html = await fetch(songUrl).then(res => res.text())

    const $ = cheerio.load(html)
    let lyrics = ''

    $('[data-lyrics-container="true"]').each((_, container) => {
      $(container).children().each((_, el) => {
        const line = $(el).text().trim()
        if (
          line &&
          !line.toLowerCase().includes('read more') &&
          !line.match(/translations|contributors|official|click/i)
        ) {
          lyrics += line + '\n'
        }
      })
    })

    return NextResponse.json({ lyrics, url: songUrl })
  } catch (err) {
    console.error('❌ Error in API /api/genius:', err)
    return NextResponse.json({ error: 'Failed to fetch lyrics.' }, { status: 500 })
  }
}
