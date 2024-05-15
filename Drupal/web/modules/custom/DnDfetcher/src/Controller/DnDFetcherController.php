<?php

namespace Drupal\DnDfetcher\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\DnDFetcher\EventhubApiContentService;
use Drupal\DnDFetcher\Form\DnDFetcherForm;

class DnDFetcherController extends ControllerBase {

    /**
     * Content.
     *
     * @return array
     *   A render array containing the fetched data or an error message.
     */
        public function content() {
          $url = "https://api.open5e.com/v1/monsters/?page=1";
          $totalItems = 0; // Variable to store the total number of items fetched.
          $markup = ''; // Initialize markup variable.
          $names = [];

          // Fetch data from each page until there is no more data to fetch.
          while ($url) {
            $response = \Drupal::httpClient()->get($url);
            $data = json_decode($response->getBody());

            // Check if data is fetched successfully.
            if ($data && isset($data->results)) {
              // Increment the total number of items fetched.
              $totalItems += count($data->results);
            
              foreach($data->results as $result){
                if(isset($result->name)) {
                    $names[] = $result->name;
                }
              }
            // Prepare the markup to display the names.
            $markup = '<p>Names of all results:</p>';
            $markup .= '<ul>';
            foreach ($names as $name) {
                $markup .= '<li>' . $name . '</li>';
            }
            $markup .= '</ul>';              
            // Check if there's a next page. If yes, update the URL; otherwise, break the loop.
              if (isset($data->next)) {
                $url = $data->next;
              }
              else {
                break;
              }
            }
            else {
              // If data fetching fails, set an error message.
              $totalItems = $this->t('Failed to fetch data from API.');
              break;
            }
          }
      
          // Return a render array containing the total number of items fetched.
          return [
            '#markup' => '<h1>Monsters Api Fetch & Node Creation</h1>'.'<p>Total items fetched: ' . $totalItems . '</p>' . '<div>'. $markup . '</div>',
          ];
        }
      
}
