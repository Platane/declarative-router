import React, { Component } from 'react'
import { connect } from 'react-redux'
import { goTo } from '../action'

const isExternalUrl = url => !!url.match(/^https?:\/\//)

const prefix = (pathPrefix, href) =>
  '/' + [...pathPrefix.split('/'), ...href.split('/')].filter(Boolean).join('/')

const normalize = pathPrefix => href =>
  isExternalUrl(href) ? href : prefix(pathPrefix, href)

export class StatelessLink extends Component {
  static defaultProps = {
    pathPrefix: '',
    target: null,
    href: '',
    hash: '',
    query: {},
  }

  linkClicked = (e: MouseEvent) => {
    this.props.onClick && this.props.onClick(e)

    if (
      e.currentTarget.nodeName === 'A' &&
      (e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        (e.nativeEvent && e.nativeEvent.which === 2))
    ) {
      // ignore click for new tab / new window behavior
      return
    }

    if (isExternalUrl(this.props.href)) return

    e.preventDefault()

    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
      document.body.focus()
    }

    this.props.goTo(this.props.href, this.props.query, this.props.hash)
  }

  render() {
    const props = {
      href: normalize(this.props.pathPrefix)(this.props.href),
      target: this.props.target,
      onClick: this.linkClicked,
    }

    Object.assign(this.props.children[0].attributes, props)

    return this.props.children[0]
  }
}

export const Link = connect(null, { goTo })(StatelessLink)
