export default {
  name: 'FormatMessage',
  functional: true,
  props: {
    path: {
      type: String,
      required: true
    },
    data: {
      type: Object
    },
    defaultMessage: {
      type: String
    },
    tag: {
      type: [String, Object],
      default: 'span'
    }
  },
  render(h, { props, data, listeners, parent }) {
    const inter = parent.$inter
    const message = inter.formatMessage(
      {
        path: props.path,
        defaultMessage: props.defaultMessage
      },
      props.data
    )

    return h(
      props.tag,
      {
        ...data,
        on: listeners
      },
      [message]
    )
  }
}
