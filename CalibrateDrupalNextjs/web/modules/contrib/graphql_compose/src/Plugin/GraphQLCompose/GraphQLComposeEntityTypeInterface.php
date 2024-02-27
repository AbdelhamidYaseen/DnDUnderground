<?php

declare(strict_types=1);

namespace Drupal\graphql_compose\Plugin\GraphQLCompose;

use Drupal\Component\Plugin\DerivativeInspectionInterface;
use Drupal\Component\Plugin\PluginInspectionInterface;
use Drupal\graphql\GraphQL\ResolverBuilder;
use Drupal\graphql\GraphQL\ResolverRegistryInterface;
use Drupal\graphql_compose\Wrapper\EntityTypeWrapper;

/**
 * Defines a entity type plugin that returns a entity type part.
 */
interface GraphQLComposeEntityTypeInterface extends PluginInspectionInterface, DerivativeInspectionInterface {

  /**
   * Get the entity type id for this plugin.
   *
   * @return string
   *   The entity type id.
   */
  public function getEntityTypeId(): string;

  /**
   * Description of this entity type.
   *
   * @return string|null
   *   Description of this entity type.
   */
  public function getDescription(): ?string;

  /**
   * Interfaces for this entity type.
   *
   * @return string[]
   *   Interfaces for this entity type.
   */
  public function getInterfaces(): array;

  /**
   * Prefix for this entity type. Eg Paragraph.
   *
   * @return string
   *   Prefix for this entity type. Eg Paragraph.
   */
  public function getPrefix(): string;

  /**
   * Fetch enabled base fields for an entity type.
   *
   * @return array
   *   An array of enabled base fields.
   */
  public function getBaseFields(): array;

  /**
   * Get bundles enabled for this entity type.
   *
   * @return \Drupal\graphql_compose\Wrapper\EntityTypeWrapper[]
   *   Enabled bundles for plugin.
   */
  public function getBundles(): array;

  /**
   * Get single bundle by bundle id, enabled for this entity type.
   *
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function getBundle(string $bundle_id): ?EntityTypeWrapper;

  /**
   * Entity wide type registration.
   */
  public function registerTypes(): void;

  /**
   * Allow type plugins to add extra resolvers.
   *
   * @param \Drupal\graphql\GraphQL\ResolverRegistryInterface $registry
   *   The resolver registry.
   * @param \Drupal\graphql\GraphQL\ResolverBuilder $builder
   *   The resolver builder.
   */
  public function registerResolvers(ResolverRegistryInterface $registry, ResolverBuilder $builder): void;

  /**
   * Type for the Schema. Camel cased. Eg node, paragraph.
   *
   * @return string
   *   The string used for queries.
   */
  public function getNameSdl(): string;

  /**
   * Type for the Schema. Title and Camel cased. Eg Node, Paragraph.
   *
   * @return string
   *   The string used for the schema type.
   */
  public function getTypeSdl(): string;

  /**
   * Get common union name between entity bundles.
   *
   * @return string
   *   Common union name between entity bundles.
   */
  public function getUnionTypeSdl(): string;

  /**
   * Check if simple queries are enabled.
   *
   * @return bool
   *   True if simple queries are enabled.
   */
  public function isQueryLoadSimple(): bool;

}
