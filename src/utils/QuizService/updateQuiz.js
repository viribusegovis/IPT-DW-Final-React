export const updateQuiz = async (updatedQuiz, quizImage, questionImages) => {
    const formData = new FormData();

    formData.append('quizJson', JSON.stringify(updatedQuiz));


    if (quizImage) {
        formData.append('quizImage', quizImage, quizImage.name);
    }
    if (questionImages) {
        Object.entries(questionImages).forEach(([index, file]) => {
            formData.append('questionImages', file, index + "." + file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2));
            console.log(index + "." + file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2))
        });
    }
    console.log(updatedQuiz, questionImages);

    try {
        // Display the key/value pairs
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        new Response(formData).text().then(console.log) // To see the entire raw body
        const response = await fetch(`https://localhost:7177/api/QuizApi/${updatedQuiz.id}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.title || 'Failed to update quiz');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating quiz:', error);
        throw error;
    }
};
