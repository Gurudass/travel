function generatePDF() {
    if (window.innerWidth <= 768) {
        // For mobile devices, use the mobile-specific PDF generation function
        generatePDFMobile();
    } else {
        // For desktops/laptops, use the desktop-specific PDF generation function
        generatePDFDesktop();
    }
}

// Mobile PDF generation
function generatePDFMobile() {
    const element = document.getElementById('content-to-pdf');

    const options = {
        margin: [10, 10, 10, 10],
        filename: 'Travel_Magica_Package_Details.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: {
            scale: window.devicePixelRatio > 1 ? 4 : 2,
            scrollX: false,
            scrollY: false,
            useCORS: true,
            allowTaint: false,
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
        },
        jsPDF: {
            unit: 'px',
            format: [element.scrollWidth, element.scrollHeight],
            orientation: 'portrait',
        },
    };

    // Generate PDF
    html2pdf().from(element).set(options).save();
}

// Desktop PDF generation
function generatePDFDesktop() {
    const element = document.getElementById('content-to-pdf');

    const originalStyles = {
        width: element.style.width,
        height: element.style.height,
        transform: element.style.transform,
        transformOrigin: element.style.transformOrigin,
    };

    const clonedElement = element.cloneNode(true);

    const offScreenContainer = document.createElement('div');
    offScreenContainer.style.position = 'absolute';
    offScreenContainer.style.top = '-9999px';
    offScreenContainer.style.left = '0';
    offScreenContainer.style.width = '100%';
    offScreenContainer.style.height = 'auto';
    offScreenContainer.style.overflow = 'hidden';
    offScreenContainer.appendChild(clonedElement);

    document.body.appendChild(offScreenContainer);

    html2pdf()
        .from(clonedElement)
        .set({
            margin: 0,
            filename: 'Travel_Magica_Package_Details.pdf',
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: {
                scale: 1,
                scrollX: false,
                scrollY: false,
                useCORS: true,
                allowTaint: false,
            },
            jsPDF: {
                unit: 'px',
                format: [element.scrollWidth, element.scrollHeight],
                orientation: 'portrait',
            },
        })
        .save()
        .then(() => {
            document.body.removeChild(offScreenContainer);
        });
}