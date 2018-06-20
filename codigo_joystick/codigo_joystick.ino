int joystick = 0;

int eixoX = A0;

int eixoY = A1;

int eixo2 = 8;

int x;

int y;

int botao = 12;

int bt;

void setup() {
  // put your setup code here, to run once:

 
 pinMode(eixo2, INPUT);

 pinMode(botao, INPUT);
 
 pinMode(7, OUTPUT);

 pinMode(4, OUTPUT);

 pinMode(4, OUTPUT);
 Serial.begin(9600);


 
}

void loop() {
  // put your main code here, to run repeatedly:
  x = analogRead(eixoX);                   
  y = analogRead(eixoY);

  bt = digitalRead(botao);
  if (bt == 1) {
    Serial.println(bt);  
  }
  
  
  
  if (x > 900) {
    Serial.println("RIGHT");
  } else if (y < 100) {
    Serial.println("UP");
  } else if (x < 100) {
    Serial.println("LEFT");
  } else if(y > 900){
    Serial.println("DOWN");
  } else {
    Serial.println("Stop");
  }

  delay(50);
}
