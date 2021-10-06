<?php

namespace App\Controller;

use Michelf\SmartyPants;
use Michelf\SmartyPantsTypographer;
use Parisek\Twig\TypographyExtension;
use PHP_Typography\PHP_Typography;
use PHP_Typography\Settings;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use JoliTypo\Fixer;
use Twig\Environment;
use Twig\Loader\LoaderInterface;

class mainController extends AbstractController
{
    protected string $text;

    public function __construct()
    {
        $this->text = file_get_contents(getcwd() . '/base.txt');
    }

    /**
     * @Route("/jolitypo")
     */
    public function jolitypo(): Response
    {
        $fixer = new Fixer([
            'CurlyQuote',
            'Dash',
            'Dimension',
            'Ellipsis',
            'FrenchNoBreakSpace',
            'Hyphen',
            'NoSpaceBeforeComma',
            'SmartQuotes',
            'Trademark',
            'Unit',
        ]);

        $fixer->setLocale('fr_FR');
//        $fixer->setLocale('en_UK');
//        $fixer->setLocale('de_DE');

        $transformed = $fixer->fix($this->text);
        
        return $this->render('example.html.twig', [
            'text' => $this->text,
            'transformed' => $transformed,
        ]);
    }

    /**
     * @Route("/php-typography")
     */
    public function phpTypography(): Response
    {
        $settings = new Settings();

        $settings->set_hyphenation(true);
        // Liste des langues disponibles : https://github.com/mundschenk-at/php-typography/tree/master/src/lang 
        $settings->set_hyphenation_language('fr');
//        $settings->set_hyphenation_language('en-US');

        $typo = new PHP_Typography();

        $transformed = $typo->process($this->text, $settings);

        return $this->render('example.html.twig', [
            'text' => $this->text,
            'transformed' => $transformed,
        ]);
    }

    /**
     * @Route("/smartypants")
     */
    public function smartypants(): Response
    {
        $transformed = SmartyPants::defaultTransform($this->text);

        return $this->render('example.html.twig', [
            'text' => $this->text,
            'transformed' => $transformed,
        ]);
    }
    
    /**
     * @Route("/smartypants-typographer")
     */
    public function smartypantsTypographer(): Response
    {
        $transformed = SmartyPantsTypographer::defaultTransform($this->text);

        return $this->render('example.html.twig', [
            'text' => $this->text,
            'transformed' => $transformed,
        ]);
    }
    
    /**
     * @Route("/typography-fixer")
     */
    public function typographyFixer(): Response
    {
        return $this->render('typography-fixer.html.twig', [
            'text' => $this->text,
        ]);
    }
    
    /**
     * @Route("/twig-typography")
     */
    public function twigTypography(): Response
    {
        $twig = new Environment($loader);
        $twig->addExtension(new TypographyExtension(__DIR__ . '/typography.yml'));

        return $this->render('example-twig.html.twig', [
            'text' => $this->text,
        ]);
    }
}
