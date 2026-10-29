(function(){
  var btn=document.querySelector('.menu-btn'),nav=document.getElementById('nav');
  btn.addEventListener('click',function(){
    var open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',open);
  });
  nav.addEventListener('click',function(e){
    if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');}
  });
  document.getElementById('yr').textContent=new Date().getFullYear();

  var form=document.getElementById('message'),status=form.querySelector('.status');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(form);
    if(form.action.indexOf('YOUR_FORM_ID')>-1){ // Formspree not set up yet: open email app instead
      var body='Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\nPhone: '+d.get('phone')+'\nInterested in: '+d.get('interest')+'\n\n'+d.get('message');
      location.href='mailto:hello@example.com?subject='+encodeURIComponent('Message from '+d.get('name'))+'&body='+encodeURIComponent(body);
      return;
    }
    status.textContent='Sending...';
    fetch(form.action,{method:'POST',body:d,headers:{Accept:'application/json'}})
      .then(function(r){if(!r.ok)throw 0;form.reset();status.textContent='Thanks! We got your message and will reply soon.';})
      .catch(function(){status.textContent='Message not sent. Please try again or call us.';});
  });
})();
