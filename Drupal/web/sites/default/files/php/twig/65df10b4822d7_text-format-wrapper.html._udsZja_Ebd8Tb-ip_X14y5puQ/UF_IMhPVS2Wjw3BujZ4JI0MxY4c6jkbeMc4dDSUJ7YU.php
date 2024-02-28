<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/contrib/gin/templates/form/text-format-wrapper.html.twig */
class __TwigTemplate_31294bb17c0598c1f47221979f0ca966 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 25
        $context["classes"] = ["js-form-item", "form-item", ((        // line 28
($context["description_toggle"] ?? null)) ? ("help-icon__description-container") : (""))];
        // line 31
        echo "<div";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["attributes"] ?? null), "addClass", [($context["classes"] ?? null)], "method", false, false, true, 31), 31, $this->source), "html", null, true);
        echo ">
  ";
        // line 32
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["children"] ?? null), 32, $this->source), "html", null, true);
        echo "
  ";
        // line 33
        if (($context["description"] ?? null)) {
            // line 34
            echo "    ";
            // line 35
            $context["description_classes"] = [((            // line 36
($context["aria_description"] ?? null)) ? ("form-item__description") : ("")), ((            // line 37
($context["disabled"] ?? null)) ? ("is-disabled") : ("")), (((            // line 38
($context["description_display"] ?? null) == "invisible")) ? ("visually-hidden") : (""))];
            // line 41
            echo "    <div";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["description_attributes"] ?? null), "addClass", [($context["description_classes"] ?? null)], "method", false, false, true, 41), 41, $this->source), "html", null, true);
            echo ">";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["description"] ?? null), 41, $this->source), "html", null, true);
            echo "</div>
  ";
        }
        // line 43
        echo "</div>
";
        $this->env->getExtension('\Drupal\Core\Template\TwigExtension')
            ->checkDeprecations($context, ["description_toggle", "attributes", "children", "description", "aria_description", "disabled", "description_display", "description_attributes"]);    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "themes/contrib/gin/templates/form/text-format-wrapper.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  68 => 43,  60 => 41,  58 => 38,  57 => 37,  56 => 36,  55 => 35,  53 => 34,  51 => 33,  47 => 32,  42 => 31,  40 => 28,  39 => 25,);
    }

    public function getSourceContext()
    {
        return new Source("", "themes/contrib/gin/templates/form/text-format-wrapper.html.twig", "/var/www/html/web/themes/contrib/gin/templates/form/text-format-wrapper.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("set" => 25, "if" => 33);
        static $filters = array("escape" => 31);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if'],
                ['escape'],
                []
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
