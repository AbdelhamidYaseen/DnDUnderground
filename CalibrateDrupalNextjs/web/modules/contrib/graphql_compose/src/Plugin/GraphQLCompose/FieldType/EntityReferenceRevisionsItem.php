<?php

declare(strict_types=1);

namespace Drupal\graphql_compose\Plugin\GraphQLCompose\FieldType;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\TypedData\TranslatableInterface;
use Drupal\graphql\GraphQL\Resolver\Composite;
use Drupal\graphql\GraphQL\ResolverBuilder;
use Drupal\graphql_compose\Plugin\GraphQLCompose\FieldUnionInterface;
use Drupal\graphql_compose\Plugin\GraphQLCompose\FieldUnionTrait;
use Drupal\graphql_compose\Plugin\GraphQLCompose\GraphQLComposeFieldTypeBase;

/**
 * {@inheritdoc}
 *
 * @GraphQLComposeFieldType(
 *   id = "entity_reference_revisions"
 * )
 */
class EntityReferenceRevisionsItem extends GraphQLComposeFieldTypeBase implements FieldUnionInterface {

  use FieldUnionTrait;

  /**
   * {@inheritdoc}
   */
  public function getProducers(ResolverBuilder $builder): Composite {
    return $builder->compose(
      // Use GraphQL module producers with buffers.
      $builder->produce('entity_reference_revisions')
        ->map('field', $builder->fromValue($this->getFieldName()))
        ->map('entity', $builder->fromParent())
        ->map('language', $builder->callback(
          fn (EntityInterface $entity) => ($entity instanceof TranslatableInterface)
            ? $entity->language()->getId()
            : NULL
        )),

      // Remove unpublished entities (optional).
      $builder->produce('entity_unpublished_filter')
        ->map('value', $builder->fromParent()),
    );
  }

}
