import twemoji from 'twemoji'

/**
 * This list is came from airbnb's language picker
 */
export const languageMap = {
  any: {
    icon: '🌏',
    label: 'Any'
  },
  id: {
    icon: '🇮🇩',
    label: 'Bahasa Indonesia'
  },
  ms: {
    icon: '🇲🇾',
    label: 'Bahasa Melayu'
  },
  ca: {
    icon: '🇦🇩',
    label: 'Català'
  },
  da: {
    icon: '🇩🇰',
    label: 'Dansk'
  },
  de: {
    icon: '🇩🇪',
    label: 'Deutsch'
  },
  en: {
    icon: '🇬🇧',
    label: 'English'
  },
  es: {
    icon: '🇪🇸',
    label: 'Español'
  },
  el: {
    icon: '🇬🇷',
    label: 'Ελληνικά'
  },
  fr: {
    icon: '🇫🇷',
    label: 'Française'
  },
  hr: {
    icon: '🇭🇷',
    label: 'Hrvatski'
  },
  it: {
    icon: '🇮🇹',
    label: 'Italiano'
  },
  hu: {
    icon: '🇭🇺',
    label: 'Magyar'
  },
  nl: {
    icon: '🇳🇱',
    label: 'Nederlands'
  },
  no: {
    icon: '🇳🇴',
    label: 'Norsk'
  },
  pl: {
    icon: '🇵🇱',
    label: 'Polski'
  },
  pt: {
    icon: '🇵🇹',
    label: 'Português'
  },
  fi: {
    icon: '🇫🇮',
    label: 'Suomi'
  },
  sv: {
    icon: '🇸🇪',
    label: 'Svenska'
  },
  tr: {
    icon: '🇹🇷',
    label: 'Türkçe'
  },
  is: {
    icon: '🇮🇸',
    label: 'Íslenska'
  },
  cs: {
    icon: '🇨🇿',
    label: 'Čeština'
  },
  ru: {
    icon: '🇷🇺',
    label: 'Русский'
  },
  th: {
    icon: '🇹🇭',
    label: 'ภาษาไทย'
  },
  zh: {
    icon: '🇨🇳',
    label: '中文 (简体)'
  },
  'zh-TW': {
    icon: '🇹🇼',
    label: '中文 (繁體)'
  },
  ja: {
    icon: '🇯🇵',
    label: '日本語'
  },
  ko: {
    icon: '🇰🇷',
    label: '한국어'
  }
}

const LanguageEmoji = ({ lang, ...otherProps }) => {
  const emoji = languageMap[lang] == null
    ? '❓'
    : languageMap[lang].icon
  const code = twemoji.convert
    .toCodePoint(emoji)

  return (
    <img
      draggable={false}
      alt={emoji}
      src={`https://twemoji.maxcdn.com/2/svg/${code}.svg`}
      style={{
        width: '1em',
        height: '1em'
      }}
    />
  )
}

export default LanguageEmoji
