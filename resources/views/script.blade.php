<script>
 document.addEventListener('DOMContentLoaded', function() {
        var swiper = new Swiper('.clients-slider', {
            direction: 'horizontal', // Slide direction: horizontal (default)
            // Add other Swiper settings here if needed
        });
    });



    function openMailApp() {
          // Get the form values
          var subject = "Kontak dari Website";
          var message = document.getElementById("message").value;

          // Generate the mailto link
          var mailtoLink = "mailto:rico@satu-tech.com";
          mailtoLink += "?subject=" + encodeURIComponent(subject);
          mailtoLink += "&body=" + encodeURIComponent(message);

          // Open the user's mail app or a new message if already open
          var win = window.open(mailtoLink, '_blank');
          if (!win || win.closed || typeof win.closed === 'undefined') {
              window.location.href = mailtoLink;
          }
      }

      function openChat() {
            var whatsappNumber = "628119722305";

            var whatsappURL = "https://wa.me/" + whatsappNumber;
            window.open(whatsappURL, "_blank", "width=400,height=500");
        }


</script>


  <!-- Vendor JS Files -->
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>
