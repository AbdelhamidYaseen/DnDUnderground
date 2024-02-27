import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface NodeSpellProps {
  node: DrupalNode
}

export function NodeSpell({ node, ...props }: NodeSpellProps) {
  return (
    <article {...props}>
      <h1>Title: {node.title}</h1>
    </article>
  )
}
