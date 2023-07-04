import { writable } from 'svelte/store'

type Crd = [number, number]

const getIndex = (data: Crd[], crd: Crd) => (
  data.findIndex(el => (
    JSON.stringify(el) == JSON.stringify(crd)
  ))
)

const createData = () => {
  const { subscribe, set, update } = writable<Crd[]>([])

  const init = (size: number) => {
    let data: Crd[] = []
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        data.push([x, y])
      }
    }

    for (let i: number = 0; i < 50; i++) {
      const rnd = Math.floor(Math.random() * data.length)
      data = move(data, rnd)
    }
    return data
  }

  const move = (data: Crd[], i: number) => {
    const [x, y] = data[i]
    const crds: Crd[] = [
      [x, y - 1],
      [x + 1, y],
      [x, y + 1],
      [x - 1, y],
    ]
    for (let d: number = 0; d < 4; d++) {
      if (getIndex(data, crds[d]) == -1) continue
      const idx = [
        getIndex(data, crds[(d + 1) % 4]),
        getIndex(data, crds[(d + 2) % 4]),
        getIndex(data, crds[(d + 3) % 4]),
      ]
      if (idx[0] != -1) {
        data[idx[0]] = crds[d]
      } else {
        if (idx[1] != -1) {
          data[idx[1]] = crds[d]
        } else {
          data[idx[2]] = crds[d]
        }
      }
    }
    return data
  }

  return {
    subscribe,
    init: (size: number) => set(init(size)),
    move: (i: number) => update(data => move(data, i)),
    reset: () => set([]),
  }
}

export const data = createData()
