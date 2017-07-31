<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Design extends Model
{
  /**
   * The table associated with the model.
   *
   * @var string
   */
  protected $table = 'ddb_attributes';  

  /**
   * The relations to eager load on the withAll query
   *
   * @var array
   */
  protected $withAll = ['attribute','component','component.type'];

  /**
   * The project the Area belongs to.
   */
  public function project()
  {
      return $this->belongsTo(Project::class);
  }

  public function component()
  {
      return $this->belongsTo(Component::class);
  }

  public function attribute()
  {
      return $this->belongsTo(Attribute::class);
  }

}
