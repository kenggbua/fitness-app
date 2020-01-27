console.log('Service worker loaded');

//self is the worker
self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('push received...');
  self.registration.showNotification(data.title, {
    body: 'Ein Workout steht an',
    icon: 'https://img.icons8.com/doodle/64/000000/barbell.png'
  })
});
