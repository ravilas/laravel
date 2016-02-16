<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $table = 'user';
	protected $casts = [
	    'id' => 'integer',
	    'ranking' => 'integer'
	];
    //protected $index = 'id';

    /**
     * Scope a query to limit and get offset.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilterAll($query, $from, $to)
    {
        return $query->limit($to)->offset($from);
    }

}
