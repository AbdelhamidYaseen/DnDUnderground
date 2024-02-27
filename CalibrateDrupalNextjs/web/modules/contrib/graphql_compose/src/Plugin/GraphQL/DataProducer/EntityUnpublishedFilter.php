<?php

declare(strict_types=1);

namespace Drupal\graphql_compose\Plugin\GraphQL\DataProducer;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityPublishedInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\graphql\GraphQL\Execution\FieldContext;
use Drupal\graphql\Plugin\GraphQL\DataProducer\DataProducerPluginBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Remove unpublished entities from a results array.
 *
 * @DataProducer(
 *   id = "entity_unpublished_filter",
 *   name = @Translation("Filter out unpublished entities."),
 *   description = @Translation("Check published status on results."),
 *   produces = @ContextDefinition("any",
 *     label = @Translation("Final field results")
 *   ),
 *   consumes = {
 *     "value" = @ContextDefinition("any",
 *       label = @Translation("Field results to filter")
 *     )
 *   }
 * )
 */
class EntityUnpublishedFilter extends DataProducerPluginBase implements ContainerFactoryPluginInterface {

  /**
   * The config factory service.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected ConfigFactoryInterface $configFactory;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    $instance = new static(
      $configuration,
      $plugin_id,
      $plugin_definition
    );

    $instance->configFactory = $container->get('config.factory');

    return $instance;
  }

  /**
   * Remove unpublished entities from a results array.
   *
   * @param array $results
   *   The results form a field plugin type to process.
   * @param \Drupal\graphql\GraphQL\Execution\FieldContext $context
   *   The cache context.
   *
   * @return mixed
   *   Results from resolution. Array for multiple.
   */
  public function resolve(array $results, FieldContext $context) {
    $settings = $this->configFactory->get('graphql_compose.settings');

    if ($settings->get('settings.exclude_unpublished')) {
      $results = array_filter($results, function ($result) {
        return ($result instanceof EntityPublishedInterface)
          ? $result->isPublished()
          : TRUE;
      });
    }

    return $results;
  }

}
