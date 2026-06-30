/* Bitoreal — Shared Application JavaScript (Phase B extraction) */
/* Contains byte-identical functions shared across all pages */

function toggleTheme(){
  var current=document.documentElement.getAttribute('data-theme');
  var next=current==='dark'?'light':'dark';
  if(next==='light'){document.documentElement.removeAttribute('data-theme');document.documentElement.style.colorScheme='light';}
  else{document.documentElement.setAttribute('data-theme','dark');document.documentElement.style.colorScheme='dark';}
  localStorage.setItem('bitoreal-theme',next);
  updateToggleIcons();
}

function updateToggleIcons(){
  var isDark=document.documentElement.getAttribute('data-theme')==='dark';
  var icon=isDark?'🌙':'☀️';
  var t1=document.getElementById('themeToggle');
  var t2=document.getElementById('themeToggleMobile');
  if(t1)t1.textContent=icon;
  if(t2){t2.innerHTML=icon+' <span>'+(isDark?'Light Mode':'Dark Mode')+'</span>'}
}

function toggleMDD(id){var el=document.getElementById(id);var isOpen=el.classList.contains('open');document.querySelectorAll('.drw-dd').forEach(function(d){d.classList.remove('open')});if(!isOpen)el.classList.add('open')}

function toggleMPillar(id,e){e.stopPropagation();var el=document.getElementById(id);var isOpen=el.classList.contains('open');el.parentNode.querySelectorAll('.drw-pillar').forEach(function(d){d.classList.remove('open')});if(!isOpen)el.classList.add('open')}

function onScroll(){nw?.classList.toggle('s',window.scrollY>40)}

function cd(){drw.classList.remove('open');ham?.classList.remove('open');ham?.setAttribute('aria-expanded','false');drw.setAttribute('aria-hidden','true');document.body.style.overflow=''}

function checkFade(){
    var bar=document.getElementById('tabsBar');
    var wrap=document.getElementById('tabsWrap');
    if(!bar||!wrap)return;
    var sl=bar.scrollLeft,sw=bar.scrollWidth,cw=bar.clientWidth;
    wrap.classList.toggle('fade-left',sl>8);
    wrap.classList.toggle('fade-right',sl<sw-cw-8);
  }

function positionIndicator(tab){
  if(!indicator||!tab)return;
  if(indicator)indicator.style.left=tab.offsetLeft+'px';
  if(indicator)indicator.style.width=tab.offsetWidth+'px';
}

function showTab(id){
  if(isAnimating)return;
  var newIdx=tabIds.indexOf(id);
  if(newIdx===-1||newIdx===currentTabIdx)return;
  isAnimating=true;
  var direction=newIdx>currentTabIdx?'left':'right';
  var exitClass='exit-'+direction;
  var enterClass=direction==='left'?'enter-right':'enter-left';

  /* Update tab active state */
  tabs.forEach(function(t){t?.classList.remove('active');t?.setAttribute('aria-selected','false')});
  var newTab=document.getElementById('t-'+id);
  newTab.classList.add('active');
  newTab.setAttribute('aria-selected','true');
  newTab.scrollIntoView({inline:'center',block:'nearest',behavior:'smooth'});
  positionIndicator(newTab);

  /* Animate panels */
  var oldPanel=document.querySelector('.svc-panel.active');
  var newPanel=document.getElementById('p-'+id);

  /* Exit old */
  if(oldPanel){
    oldPanel?.classList.add(exitClass);
    oldPanel?.classList.remove('active');
  }

  /* Prepare new */
  newPanel.classList.add(enterClass);
  newPanel.style.position='relative';
  newPanel.style.visibility='visible';
  newPanel.style.pointerEvents='auto';

  /* Trigger reflow then animate in */
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      newPanel.classList.remove(enterClass);
      newPanel.classList.add('active');

      setTimeout(function(){
        if(oldPanel){
          oldPanel?.classList.remove(exitClass);
          if(oldPanel)oldPanel.style.position='';
          if(oldPanel)oldPanel.style.visibility='';
          if(oldPanel)oldPanel.style.pointerEvents='';
        }
        currentTabIdx=newIdx;
        isAnimating=false;
        /* Update scroll fade indicators */
        var bar=document.getElementById('tabsBar');
        var wrap=document.getElementById('tabsWrap');
        if(bar&&wrap){
          var sl=bar.scrollLeft,sw=bar.scrollWidth,cw=bar.clientWidth;
          wrap?.classList.toggle('fade-left',sl>8);
          wrap?.classList.toggle('fade-right',sl<sw-cw-8);
        }
      },350);
    });
  });
}

function se(id,eid,s){var i=document.getElementById(id),e=document.getElementById(eid);if(i&&i.classList.contains('phone-num')){var w=document.getElementById(id+'Wrap');if(w)w.classList.toggle('err',s);}else{i&&i.classList.toggle('err',s);}e&&e.classList.toggle('show',s)}

function gs1(){
  document.getElementById('s2')?.classList.remove('active');
  document.getElementById('s1')?.classList.add('active');
  document.getElementById('pb2')?.classList.remove('on');
}

function tf(b){
  var item=b.closest('.faq-item');
  var isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(function(x){x.classList.remove('open');x.querySelector('.faq-q').setAttribute('aria-expanded','false')});
  if(!isOpen){item.classList.add('open');b.setAttribute('aria-expanded','true')}
}

function restrictName(el){el.value=el.value.replace(/[^a-zA-Z\u0600-\u06FF\s'.-]/g,'');}

function restrictPhone(el){el.value=el.value.replace(/[^0-9]/g,'');}

function restrictBudget(el){var d=el.value.replace(/[^0-9]/g,'');el.value=d?Number(d).toLocaleString('en-US'):'';}

var _SVC_MAP={
  invest:['Investment Advisory','Real Estate Trading','Property Valuation & Appraisal'],
  build:['Construction','Construction Supervision','Engineering Services','Materials Supply','Town Planning'],
  manage:['Property Management','Facility Management','Building Management System','Legal Solutions'],
  transform:['Interior Designing','Smart Building','Green Building'],
  digitize:['Digital Marketing Solutions','Branding, Events & Physical Marketing','Tech Solutions & Setup']
};
function populateServices(pillar){
  var wrap=document.getElementById('fsvcWrap');
  var sel=document.getElementById('fsvc');
  if(!wrap||!sel)return;
  var list=_SVC_MAP[pillar];
  if(!list){wrap.style.display='none';sel.innerHTML='<option value="">Select a service</option>';return;}
  var html='<option value="">Select a service</option>';
  for(var i=0;i<list.length;i++){html+='<option value="'+list[i]+'">'+list[i]+'</option>';}
  sel.innerHTML=html;
  wrap.style.display='';
  wrap.style.animation='ferrIn .25s ease';
}

function restrictEmail(el){el.value=el.value.replace(/[^a-zA-Z0-9@._+\-]/g,'');}

function genToken(prefix){var t=Date.now().toString(36).slice(-6).toUpperCase();var r=Math.random().toString(36).slice(2,4).toUpperCase();return prefix+'-'+t+r;}

function submitToApi(data){var _key='b6f4a7e7-b7dd-4ea7-b7d7-a9a5f0631e55';var _suc=data._successId,_wrap=data._formWrapId,_err=data._errId;
  // Friendly labels for known fields; order preserved for the email body
  var _labels={token:'Token',name:'Name',phone:'Phone',email:'Email',service:'Service',serviceDetail:'Specific Service',budget:'Estimated Budget',city:'City',role:'Role / Position',message:'Message',source:'Source'};
  var _order=['token','name','phone','email','service','serviceDetail','budget','city','role','message','source'];
  var payload={access_key:_key,subject:'New Bitoreal Request ['+(data.token||'')+'] - '+(data.serviceDetail||data.service||data.source||'Inquiry'),from_name:(data.name||'Website Visitor'),botcheck:data._botcheck||''};
  // Build phone with country code
  var _phone=(data.countryCode||'+92')+' '+(data.phone||'');
  // Forward ordered known fields (only if the form provided them)
  for(var i=0;i<_order.length;i++){var k=_order[i];if(k==='phone'){if(data.phone!==undefined)payload['Phone']=_phone;continue;}
    if(data[k]!==undefined&&data[k]!==''&&data[k]!==null){payload[_labels[k]]=data[k];}}
  // Forward any extra custom fields the caller added that aren't internal (_*) or already handled
  var _handled={countryCode:1,_successId:1,_formWrapId:1,_errId:1,_botcheck:1,phone:1};
  for(var key in data){if(data.hasOwnProperty(key)&&key.charAt(0)!=='_'&&!_handled[key]&&!_labels[key]&&data[key]!==''&&data[key]!=null){var _lbl=key.charAt(0).toUpperCase()+key.slice(1).replace(/([A-Z])/g,' $1');payload[_lbl]=data[key];}}
  fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload)}).then(function(r){return r.json();}).then(function(j){if(!(j&&j.success))throw new Error('fail');}).catch(function(){if(_suc){var s=document.getElementById(_suc);if(s)s.classList.remove('show');}if(_wrap){var w=document.getElementById(_wrap);if(w)w.style.display='';}if(_err){var e=document.getElementById(_err);if(e)e.style.display='block';}else{alert('Sorry, we could not send your request. Please WhatsApp us at +92 307 0777 007 or try again.');}});}

function updatePhoneCode(id){
  var s=document.getElementById(id+'Code');
  if(!s)return;
  var o=s.options[s.selectedIndex];
  var fg=document.getElementById(id+'Flag');
  var cn=document.getElementById(id+'CodeNum');
  if(fg)fg.textContent=o.getAttribute('data-flag')||'🇵🇰';
  if(cn)cn.textContent=o.value||'+92';
}


/* ═══ CANONICAL ANCHOR NAVIGATION (centralized) ═══ */
(function(){
  function scrollToTarget(el){
    if(!el)return;
    el.scrollIntoView({behavior:'smooth',block:'start'});
  }
  // Event delegation: one listener for all same-page anchors
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a)return;
    var href=a.getAttribute('href');
    if(!href)return;
    // Only handle PURE same-page hash links (#id). Cross-page (/page#id) pass through to browser.
    if(href.charAt(0)!=='#'||href==='#')return;
    var target=document.getElementById(href.slice(1));
    if(!target)return; // let browser handle if no target (no-op)
    e.preventDefault();
    if(typeof cd==='function')cd(); // close mobile drawer if open
    scrollToTarget(target);
    // Update URL hash without jumping
    if(history.pushState)history.pushState(null,'',href);
  });
  // On-load hash handling: when page loads with #hash (incl. cross-page arrivals),
  // re-scroll after layout settles (fonts/images can shift position)
  function handleLoadHash(){
    if(!location.hash||location.hash==='#')return;
    var target=document.getElementById(location.hash.slice(1));
    if(!target)return;
    // Wait for layout to settle, then position correctly (scroll-margin-top handles offset)
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        target.scrollIntoView({behavior:'auto',block:'start'});
      });
    });
  }
  if(document.readyState==='complete'||document.readyState==='interactive'){handleLoadHash();}
  else{window.addEventListener('DOMContentLoaded',handleLoadHash);}
  // Re-position after full load (images/fonts done) to fix layout-shift drift
  window.addEventListener('load',function(){
    if(location.hash&&location.hash!=='#'){
      var t=document.getElementById(location.hash.slice(1));
      if(t)t.scrollIntoView({behavior:'auto',block:'start'});
    }
  });
})();
