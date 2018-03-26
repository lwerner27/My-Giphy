$(document).ready(function () {

    Materialize.updateTextFields();
    // Arrays and Variables
    let myTopics = ["Video Games", "Baseball", "Football", "The Eagles", "Marvel"]
    let buttonDump = $("#button-dump")
    let whichSide = "left"

    let url = "https://api.giphy.com/v1/gifs/search"

    function createButtons () {
        buttonDump.empty()
        for (let i = 0; i < myTopics.length; i++) {
            let currentTopic = myTopics[i]
            let newButton = $(`<a class="waves-effect waves-light btn topic-button">${currentTopic}</a>`)
            newButton.css("margin", "10px")
            newButton.attr("value", `${currentTopic}`)
            buttonDump.append(newButton)
        }
    }

    $(document).on("click", "#add-button", function () {
        let newTopic = $("#new-topic").val()
        myTopics.push(newTopic)
        createButtons()
        $("#new-topic").val("")
    })




    $(document).on("click", ".topic-button", function (event) {
        let pushedButton = event.target.text

        url += '?' + $.param({
            'api_key': "6fG5QA2PRgEXIN2mGZp3hQ20LvlvHW3V",
            "q": pushedButton,
            "limit": "10"
          });

          $.ajax({
              url: url,
              method: "GET"
          }).then(function(result) {

            let amountOfGifs = result.data.length

            for (let i = 0; i < amountOfGifs; i++) {
                let currentGif = result.data[i]

                let gifContainer = $("<div>")
                gifContainer.attr('class', "gif-container")

                let rating = $("<h5>")
                rating.text(`Rating: ${currentGif.rating}`)
                
                let newGif = $("<img>")
                newGif.attr("src", currentGif.images.downsized_still.url)
                newGif.attr("data-animate", currentGif.images.downsized.url)
                newGif.attr("data-still", currentGif.images.downsized_still.url)
                newGif.attr("data-state", "still")
                newGif.attr("class", "new-gif")

                gifContainer.append(rating, newGif)

                if (whichSide === "left") {
                    $("#gif-dump-left").prepend(gifContainer)
                    whichSide = "right"
                } else if (whichSide === "right") {
                    $("#gif-dump-right").prepend(gifContainer)
                    whichSide = "left"
                }
            }
          })


    })

    createButtons()

    $(document).on('click', '.new-gif', function (event) {
        console.log($(this))
        let currentState =($(this)["0"].attributes[3].value)

        if(currentState === "still") {
            // Changes source to data-animate
            $(this)["0"].attributes["0"].value = $(this)["0"].attributes[1].value
            // Changes state to animate
            $(this)["0"].attributes[3].value = 'animate'
        } else {
            //Changes sourceto data-still
            $(this)["0"].attributes["0"].value = $(this)["0"].attributes[2].value
            // Changes state to still
            $(this)["0"].attributes[3].value = 'still'
        }

    })
})