int joystick = 0;

int eixoX = A0;

int eixoY = A1;

int eixo2 = 8;

int x;

int y;

String FRONT = "FRONT"; 

String BACK = "BACK";

String DOWN = "DOWN";

String POS;

void setup() {
  // put your setup code here, to run once:

 pinMode(eixo2, INPUT);

 pinMode(7, OUTPUT);

 pinMode(4, OUTPUT);

 pinMode(4, OUTPUT);
 Serial.begin(9600);


 
}

void loop() {
  // put your main code here, to run repeatedly:
  POS = "";
  x = analogRead(eixoX);                   
  y = analogRead(eixoY);
  
  
  if (x > 950) {
    Serial.println("DOWN");
  } else if (y < 50) {
    Serial.println("RIGHT");
  } else if (x < 50) {
    Serial.println("UP");
  } else if(y > 950){
    Serial.println("LEFT");
  } else {
    Serial.println("Stop");
  }

  delay(50);
}
