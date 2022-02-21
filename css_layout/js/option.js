let exampleOptions = {};
const html_ = $('html');
let html_fontSize = html_.css('font-size').replace('px','');
const pageContainer = $('.page-container');
const pages = $('.mc');

$(document).ready(()=>{
  for (let p = 0; p < pages.length; p++) {
    exampleOptions[`page${p}`] = {};
    const options = pages.eq(p).find('.option-items');
    for (let o = 0; o < options.length; o++) {
      const optionItem = options.eq(o);
      const optionCategory = optionItem.attr('data-option');
      const optionName = `option_${optionCategory}`;
      const optionInput = optionItem.find('input').eq(0).attr('type')=='radio'?optionItem.find('input:checked'):optionItem.find('input');
      const optionKey = optionInput.attr('data-key');
      const optionVal = optionInput.val();
      exampleOptions[`page${p}`][optionCategory] = [optionKey, optionVal];
    }
  }
  
  $('.page-status').text(`${pageContainer.attr('page-no')*1+1} / ${pages.length}`);
  if ($(`.mc[page-no="${pageContainer.attr('page-no')}"]`).attr('example') == 'no') $('.view-example-btn').hide();
  else $('.view-example-btn').show();
  
  $('.view-example-btn').on('click', function(){
    const pageNo = pageContainer.attr('page-no');
    $(`.mc[page-no="${pageNo}"]`).toggleClass('on');
    $(`.view-example-btn`).toggleClass('on');
  });

  $('.index-list li').on('click', function(){
    const descIndex = $(this).attr('desc-index');
    $(this).closest('.slide-contents').attr('desc-index', descIndex);
  })

  $('.slide-btn').on('click', function(e) {
    e.preventDefault();

    const direction = $(this).attr('slide-btn-type');
    let pageNo = pageContainer.attr('page-no')*1;
    if (direction == 'prev') {
      pageNo--;
    }
    else if (direction == 'next') {
      pageNo++;
    }
    
    if (pageNo < 0) pageNo = 0;
    else if (pageNo >= $('.mc').length) pageNo = $('.mc').length - 1;

    $(`.mc`).removeClass('on');
    $(`.view-example-btn`).removeClass('on');

    if (pageNo == 0) {
      $('.slide-btn[slide-btn-type="prev"]').addClass('off');
    } else if (pageNo == $('.mc').length - 1) {
      $('.slide-btn[slide-btn-type="next"]').addClass('off');
    } else {
      $('.slide-btn').removeClass('off');
    }
    pageContainer.attr('page-no', pageNo)

    if ($(`.mc[page-no="${pageContainer.attr('page-no')}"]`).attr('example') == 'no') $('.view-example-btn').hide();
    else $('.view-example-btn').show();
    
    $('.page-status').text(`${pageNo + 1} / ${pages.length}`);
  })

  $('#boxSizing_width').text(rem_(300))
  $('#boxSizing_height').text(rem_(150))

  $('.option-check').on('click', function (e) {
    const radio = $(this);
    const pageNo = $(this).closest('.mc').attr('page-no');
    const optionName = radio.attr('name');
    console.log(`optionName: ${optionName}`)
    const optionCateogry = optionName.split('_')[1];
    const optionKey = radio.attr('data-key');
    const optionVal = radio.val();
    exampleOptions[`page${pageNo}`][optionCateogry] = [optionKey, optionVal];
  
    console.log(`[change option] ${optionCateogry}: ${optionVal}`)
    applyOption(optionCateogry)
  });
  $('.option-input').on('change', function (e) {
    const textInput = $(this);
    const pageNo = $(this).closest('.mc').attr('page-no');
    const optionName = textInput.attr('name');
    console.log(`optionName: ${optionName}`)
    const optionCateogry = optionName.split('_')[1];
    const optionKey = textInput.attr('data-key');
    const optionVal = textInput.val();
    exampleOptions[`page${pageNo}`][optionCateogry] = [optionKey, optionVal];
  
    console.log(`[change option] ${optionCateogry}: ${optionVal}`)
    applyOption(optionCateogry)
  });
})

$(window).on('resize', function(){
  html_fontSize = html_.css('font-size').replace('px','');

  $('#boxSizing_width').text(rem_(300))
  $('#boxSizing_height').text(rem_(150))
})

function rem_(px) {
  return px * (html_fontSize * 100) / 1920;
}

function applyOption(category) {
  const pageNo = $('.page-container').attr('page-no')*1;
  const page = $(`.mc[page-no="${pageNo}"]`);
  const optionKey = exampleOptions[`page${pageNo}`][category][0];
  const optionVal = exampleOptions[`page${pageNo}`][category][1];

  if (pageNo == 2) {
    // box-sizing
    page.find('.example-box').css(optionKey, optionVal)
  } else if (pageNo == 3) {
    if (category == 'textAlign') page.find('.example-container').css(optionKey, optionVal);
    else page.find('.example-box').css(optionKey, optionVal);
  } else if (pageNo == 4) {
    page.find('.example-container').css(optionKey, optionVal);
  }
}