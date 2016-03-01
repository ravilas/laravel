<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class PagesController extends Controller
{
    public function getIndex() {
        return view('pages.index');
    }
    public function getAbout() {
        return view('pages.about');
    }
    public function getContact() {
        return view('pages.contact');
    }
    public function getHelp() {
        return view('pages.help');
    }
    public function getAboutId($id = '') {
        $isUserRegistered = false;
        $params = compact('id');
        $params['arrFE'] = ['k1' => 'a', 'k6' => 'b', 'k5' => 'c', 'k4' => 'd'];
        return view('pages.aboutid', $params)
                ->with('isUserRegistered', $isUserRegistered);
        //return view('user.profile', ['user' => User::findOrFail($id)]);
    }
    public function getAboutIdAuth($id = '') {
        $this->middleware('auth');

        $this->middleware('log', ['only' => [
            'fooAction',
            'barAction',
        ]]);

        $this->middleware('subscribed', ['except' => [
            'fooAction',
            'barAction',
        ]]);
    }
}