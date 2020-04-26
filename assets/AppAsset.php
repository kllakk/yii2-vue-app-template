<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\helpers\ArrayHelper;
use yii\web\AssetBundle;

/**
 * Main application asset bundle.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
    public $sourcePath = '@app/app/dst';
    public $depends = [
        'yii\web\YiiAsset',
        //'yii\bootstrap4\BootstrapAsset',
    ];

    public function init()
    {
        parent::init();

        $assets = @file_get_contents(__DIR__ . '/../app/dst/manifest.json');
        $assets = (array)json_decode($assets);

        $this->css [] = ArrayHelper::getValue($assets, 'site.css');
        $this->js [] = ArrayHelper::getValue($assets, 'site.js');
    }
}
