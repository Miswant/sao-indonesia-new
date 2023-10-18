<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function switchLanguage($lang)
    {
        // Lakukan sesuatu dengan $lang, seperti mengatur locale dan mengarahkan ke halaman yang sesuai.
        app()->setLocale($lang);
        return redirect()->back();
    }
}
