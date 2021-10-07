const DOMPropNames = new Set(['id'])

const labelablePropNames = new Set([
  'aria-label',
  'aria-labelledby',
  'aria-describedby',
  'aria-details',
])

const BasePropNames = new Set([
  'as',
  'css',
  'qa',
  'qaVal',
  'hidden',
  'isHidden',
  'disabled',
  'isDisabled',
  'children',
  'style',
  'className',
  'href',
  'target',
])

const ignoreEventPropsNames = new Set([
  'onPress',
  'onHoverStart',
  'onHoverEnd',
  'onPressStart',
  'onPressEnd',
])

const propRe = /^((data-).*)$/
const eventRe = /^on[A-Z].+$/

interface PropsFilterOptions {
  labelable?: boolean
  propNames?: Set<string>
  eventProps?: boolean
}

/**
 * Filters out all props that aren't valid DOM props or defined via override prop obj.
 * @param props - The component props to be filtered.
 * @param opts - Props to override.
 */
export function filterBaseProps(props, opts: PropsFilterOptions = {}) {
  const { labelable, propNames, eventProps } = opts
  const filteredProps = {}

  for (const prop in props) {
    if (
      Object.prototype.hasOwnProperty.call(props, prop) &&
      (DOMPropNames.has(prop) ||
        BasePropNames.has(prop) ||
        (labelable && labelablePropNames.has(prop)) ||
        (eventProps &&
          eventRe.test(prop) &&
          !ignoreEventPropsNames.has(prop)) ||
        propNames?.has(prop) ||
        propRe.test(prop))
    ) {
      filteredProps[prop] = props[prop]
    }
  }

  return filteredProps
}
