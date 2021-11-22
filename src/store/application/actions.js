export function close(state, { slug }) {
  return state.popupList.set(list =>
    list.filter(({ slug: checkSlug }) => checkSlug !== slug),
  )
}

export function open(state, { slug, render, params }) {
  const { dismissCallback } = params

  return state.popupList.set(current => {
    return [
      ...current.filter(({ slug: checkSlug }) => checkSlug !== slug),
      {
        slug,
        render,
        onDismiss: () => {
          close(state, { slug })
          if (typeof dismissCallback === 'function') dismissCallback()
        },
      },
    ]
  })
}
