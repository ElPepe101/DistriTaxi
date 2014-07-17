<?php

define('TEMPLATE', 'template/');
define('MODULES', TEMPLATE.'modules/');
define('SECTIONS', TEMPLATE.'sections/');

require __DIR__ . '/vendor/autoload.php';
require_once 'NotORM.php';

$app = new \Slim\Slim();
$app->config(array(
	'templates.path' => MODULES
));

$pdo = new PDO('mysql:dbname=HackDFTest;host=localhost', 'ElPepe', '%1a2s3d4f%G_');
$db = new NotORM($pdo);

$app->get('/clients/requests', function() use ($app, $db) {
	
	$data = array();
	foreach ($db->clients()->where('status', 1) as $task) {
		$data[] = array(
			'id' =>				$task['id'],
			'direction' =>		$task['direction'],
			'destiny' =>		$task['destiny'],
			'date_created' =>	$task['date_created']
		);
	}
	
	$app->response()->header('Content-Type', 'application/json');
	$app->response->body(json_encode($data));
});

$app->get('/taxista', function() use ($app) {
	$app->render('taxista.html');
});

$app->put('/taxista/:id', function($id) use ($app, $db) {
	// Code to update donut with id, $id
	$response = $app->response();
	$response->status(200);  // OK!
	$response->header('status','200');  // OK!
	$response['Content-Type'] = 'application/json';
	$response->body(json_encode(array($id)));
	// But you can send back other status like 400 which can trigger an error callback.
});

$app->get('/cliente', function() use ($app, $db) {
	
	$data = array();
	foreach ($db->reporte_vial()->where('apertura LIKE ?', '31/12/2013%') as $task) {
		$data[] = array(
				'no_ticket' =>	$task['no_ticket'],
				'apertura' =>	$task['apertura'],
				'motivo' =>		$task['motivo'],
				'lat' =>		$task['lat'],
				'lng' =>		$task['lng']
		);
	}
	
	$app->render('cliente.html', array('data'=>$data));
	
	//$app->response()->header('Content-Type', 'application/json');
	//$app->response->body(json_encode($data));
	
});

$app->get('/cliente/reportes', function() use ($app, $db) {

	$data = array();
	foreach ($db->reporte_vial()->where('apertura LIKE ?', '%/12/2013%') as $task) {
		$data[] = array(
				'no_ticket' =>	$task['no_ticket'],
				'apertura' =>	$task['apertura'],
				'motivo' =>		$task['motivo'],
				'lat' =>		$task['lat'],
				'lng' =>		$task['lng']
		);
	}

	//$app->render('cliente.html', array('data'=>$data));

	$app->response()->header('Content-Type', 'application/json');
	$app->response->body(json_encode($data));
	
});

$app->put('/cliente/new/:id', function($id) use ($app, $db) {
	// Code to update donut with id, $id
	
	/*
     * We are reading JSON object received in HTTP request body and converting it to array
     */
    $client = (array) json_decode($app->request()->getBody());
 	unset($client['id']);
    /*
     * Inserting new task to DB
     */
    $data = $db->clients()->insert($client);
    
    if($data !== false){
    	$app->response()->header('Content-Type', 'application/json');
    	$app->response->body(json_encode($data));
    } else {
    	//$response = $app->response();
    	$app->halt(500, json_encode(array('status' => "ERROR")));
    }
	

});
	
$app->run();

/*
function _fileName($file = null) {
	$file = is_null($file)? __FILE__: $file;
	return str_replace('.php', '', basename($file));
}

function getHead($file) {
	$name = _fileName($file);
	include_once SECTIONS.'head.php';
}

function getFoot($file) {
	$name = _fileName($file);
	include_once SECTIONS.'foot.php';
}

//print_r($_SERVER);
if ( $_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'] == $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']._fileName() ) {
	header('location: taxista.php');
} //die ("Direct access not premitted");
*/
