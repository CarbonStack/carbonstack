// Find from here to add more. => http://www-01.sil.org/iso639-3/codes.asp?order=639_1&letter=%25
function getEmoji (lang) {
  switch (lang) {
    case 'any':
      return '🌏'
    case 'eng':
      return '🇬🇧'
    case 'fra':
      return '🇫🇷'
    case 'deu':
      return '🇩🇪'
    case 'ita':
      return '🇮🇹'
    case 'jpn':
      return '🇯🇵'
    case 'kor':
      return '🇰🇷'
    case 'nld':
      return '🇳🇱'
    case 'por':
      return '🇵🇹'
    case 'rus':
      return '🇷🇺'
    case 'spa':
      return '🇪🇸'
    case 'zho':
      return '🇨🇳'
    default:
      return '❓'
  }
}
const LanguageEmoji = ({ lang, ...otherProps }) => {
  return <span
    {...otherProps}
  >
    {getEmoji(lang)}
  </span>
}

export default LanguageEmoji
