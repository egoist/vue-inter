import MessageFormat from 'intl-messageformat'

export default function(message, data) {
  if (!data) return message

  const tpl = new MessageFormat(message, this.currentLocale)
  return tpl.format(data)
}
