<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', function () {
    return view('index');
});
Route::get('/module', function () {
    return view('contoh-module');
});
Route::get('/contact', function () {
    return view('contact');
});
Route::get('/mikro-kecil', function () {
    return view('mikro-kecil');
});
Route::get('/perusahaan-menengah', function () {
    return view('perusahaan-menengah');
});
Route::get('/trading-distribusi', function () {
    return view('trading-distribusi');
});
Route::get('/multi-cabang', function () {
    return view('multi-cabang');
});
Route::get('/integrasi-berbagai-modul', function () {
    return view('fiturSAO/integrasi-berbagai-modul');
});
Route::get('/manajemen-stok-dan-persediaan', function () {
    return view('fiturSAO/manajemen-stock-persediaan');
});
Route::get('/akutansi-keuangan', function () {
    return view('fiturSAO/akutansi-keuangan');
});
// Route::get('/{lang}', 'LanguageController@switchLanguage');
