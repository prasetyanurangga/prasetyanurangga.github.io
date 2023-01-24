const file = "data.json";
const width = window.innerWidth;
const height = window.innerHeight;
const colors = {
  html: "#F16529",
  css: "#1C88C7",
  js: "#FCC700",
};

function toDataUrl(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

const generateChart = (data) => {
  const bubble = (data) =>
    d3.pack().size([width, height]).padding(2)(
      d3.hierarchy({ children: data }).sum((d) => d.score)
    );

  const base64Images = [];

  // Iterate through the array of image URLs
  // const imagePromises = data.map((item) => {
  //   return new Promise(async (resolve, reject) => {
  //     const imageUrl = "https://picsum.photos/id/156/2177/3264";
  //     // Fetch the image data
  //     try {
  //       const response = await fetch(imageUrl);
  //       const blob = await response.blob();

  //       // Create a FileReader object
  //       const reader = new FileReader();

  //       // Convert the Blob to a data URL
  //       reader.onloadend = () => {
  //         const res = reader.result;
  //         const base64 = {
  //           ...item,
  //           dataImg: res,
  //         };
  //         resolve(base64);
  //       };
  //       reader.readAsDataURL(blob);
  //     } catch (e) {
  //       reject(e);
  //     }
  //   });
  // });

  // Promise.all(imagePromises)
  //   .then((base64Array) => {
  const svg = d3
    .select("#bubble-chart")
    .append("svg")
    .style("width", width)
    .style("height", height);

  const root = bubble(data);
  const tooltip = d3.select(".tooltip");

  const node = svg.selectAll().data(root.children).enter().append("g");

  const circle = node
    .append("circle")
    .attr("fill", (d) => "url(#" + d.data.id + ")");

  var defs = svg.selectAll().data(root.children).enter().append("defs");

  defs
    .append("pattern")
    .attr("id", (d) => d.data.id)
    .attr("width", 1)
    .attr("height", 1)
    .attr("patternContentUnits", "objectBoundingBox")
    .append("svg:image")
    .attr("xlink:href", (d) => d.data.img)

    .attr("x", 0)
    .attr("y", 0)
    .attr("height", 1)
    .attr("width", 1)
    .attr("preserveAspectRatio", "xMidYMid slice");

  // const label = node
  //   .append("text")
  //   .attr("dy", 2)
  //   .text((d) => d.data.name.substring(0, d.r / 3));

  node
    .transition()
    .ease(d3.easeExpInOut)
    .duration(1000)
    .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

  circle
    .transition()
    .ease(d3.easeExpInOut)
    .duration(1000)
    .attr("r", (d) => d.r);

  // d3.select("#saveButton").on("click", async function () {
  //   const chart = d3.select("#bubble-chart").node();
  //   domtoimage.toJpeg(chart, { quality: 0.95 }).then(function (dataUrl) {
  //     var link = document.createElement("a");
  //     link.download = "my-image-name.jpeg";
  //     link.href = dataUrl;
  //     link.click();
  //   });
  // });

  // label
  //   .transition()
  //   .delay(700)
  //   .ease(d3.easeExpInOut)
  //   .duration(1000)
  //   .style("opacity", 1);
  // })
  // .catch((err) => {
  //   console.log("An error occurred:", err);
  // });
};

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

async function getToken(code) {
  var clien_id = "336ea6e22aee44608bd14bf083b0aa94";
  var clien_secret = "daa9bf5f636d4b68971bf80dced2e150";
  var redirect_uri = "https://prasetyanurangga.github.io/circletify/chart.html";
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body:
        "grant_type=authorization_code&code=" +
        code +
        "&redirect_uri=" +
        redirect_uri +
        "&client_id=" +
        clien_id +
        "&client_secret=" +
        clien_secret,
    });
    const data = await response.json();
    // Do something with the data
    console.log(data.access_token);
    return data.access_token;
  } catch (error) {
    window.location.href = "index.html";
  }

  return null;
}

var code_token = getParameterByName("code");

if (!code_token) {
  window.location.href = "index.html";
}

getToken(code_token).then((access_token) => {
  console.log(access_token);

  var url = "https://api.spotify.com/v1/me/top/tracks?limit=100";

  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token,
  };

  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then(function (response) {
      // The API call was successful!
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      const image = data.items.map((item) => {
        return {
          id: item.id,
          img: item.album.images[0].url,
          score: item.popularity,
        };
      });
      generateChart(image);
      console.log(image);
    })
    .catch(function (err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });
});

// (async () => {
//   data = await d3.json(file).then((data) => data);
//   generateChart(data);
// })();
