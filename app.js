 
let json
try {
  const res = await fetch(`./data.json`)
    
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      console.dir(message)
      throw new Error(message);
    }

    json = await res.json()

} catch (error) {
  console.log('Print the error:', error)
}

const wrapper = document.getElementById("wrapper")

// prettier-ignore
const result = json?.map(
  (d,i) => `<div class="item" key=${i}>
    <div class="info">
      <a target="_blank" href=${d.link ? d.link : "/"}>
        <h2>${d.headline}</h2>
        <p>${d.lead}</p>
        <img role="link" class=${d.style ? d?.style : null} src=${d.image ? d?.image : "#"} alt=${d.image ? (d?.alt).split(" ").join("-") : "#"} />
      </a>
      <a class="repo" target="_blank" href=${d.repoLink ? d?.repoLink : "#"}>
        <h3>${d.repo ? d?.repo : null}</h3>
      </a>
    </div>
  </div>`
)

wrapper.innerHTML = result.join(" ")
