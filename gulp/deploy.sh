gulp prod
ssh oceanstar 'mkdir -p ~/www/spy-prayer'
scp -r ../public/* oceanstar:~/www/spy-prayer
