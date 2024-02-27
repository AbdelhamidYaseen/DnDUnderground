<?php

namespace Drupal\graphql_compose_edges\Filters;

use Drupal\Core\Entity\Query\QueryInterface;

/**
 * Base interface for edge filters.
 */
interface EdgeFilterInterface {

  /**
   * Filter a connection edge.
   *
   * @param \Drupal\Core\Entity\Query\QueryInterface $query
   *   The query to filter.
   */
  public function apply(QueryInterface $query): void;

}
