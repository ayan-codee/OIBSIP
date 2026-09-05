
        document.addEventListener('DOMContentLoaded', () => {
            const faqQuestions = document.querySelectorAll('.faq-question');

            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    const currentItem = question.parentElement;

                    // Optional: Agar aap chahte hain ke ek waqt mein sirf ek hi box khule (baqi close ho jayein)
                    document.querySelectorAll('.faq-item').forEach(item => {
                        if (item !== currentItem) {
                            item.classList.remove('active');
                        }
                    });

                    // Current box ko open/close karna
                    currentItem.classList.toggle('active');
                });
            });
        });