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
    const idx = [
      getIndex(data, crds[0]),
      getIndex(data, crds[1]),
      getIndex(data, crds[2]),
      getIndex(data, crds[3]),
    ]
    for (let d: number = 0; d < 4; d++) {
      if (idx[d] == -1) continue
      if (idx[(d + 1) % 4] != -1) {
        data[idx[d]] = crds[(d + 1) % 4]
      } else {
        if (idx[(d + 2) % 4] != -1) {
          data[idx[d]] = crds[(d + 2) % 4]
        } else {
          data[idx[d]] = crds[(d + 3) % 4]
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
