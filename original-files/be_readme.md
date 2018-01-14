###Tables 1

|Users|
|---|
|+id|
|+name|

|Children|
|---|
|+id|
|+name|
|+user_id|

###Snippet
#### snippet 1.0
```
Abstract Class Vehicle 
{
    abstract public function brake();
    abstract public function accelerate();
}
```
#### snippet 1.1
```
 Interface MoveAble 
 {
    public function brake();
    public function accelerate();
 }
```
#### snippet 1.2
```
class Car extends Vehicle 
{
    ...
}
```
#### snippet 1.3
```
class Car implements MoveAble 
{
    ...
}
```