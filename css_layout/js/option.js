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
      exampleOptions[`page${p}`][optionCategory] = $(`.option-check[name=${optionName}]:checked`).val();
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
    const optionVal = radio.val();
    exampleOptions[`page${pageNo}`][optionCateogry] = optionVal;
  
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
  const optionVal = exampleOptions[`page${pageNo}`][category];

  if (pageNo == 2) {
    // box-sizing
    page.find('.example-box').css('box-sizing', optionVal)
  } else if (pageNo == 3) {
  }
}